import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { deleteObject, list, ref, Storage } from '@angular/fire/storage';
import { AdminPageService } from '../services/admin-page.service';
import { DienstenPage, HomePage, OverMijPage, PortfolioPage } from '../../shared/page';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const RESOLUTIONS = ['150x150', '600x900', '1920x1920', '5000x5000'];

@UntilDestroy()
@Component({
  selector: 'app-admin-maintenance',
  templateUrl: './admin-maintenance.component.html',
  styleUrl: './admin-maintenance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AdminMaintenanceComponent {
  #adminPageService: AdminPageService = inject(AdminPageService);
  #storage: Storage = inject(Storage);

  // Signal to track missing files
  missingFiles = signal<{ imageId: string, path: string, files: string[] }[]>([]);
  // Signal to track the loading state
  isCheckingFiles = signal<boolean>(false);
  // Signal to track the status message
  statusMessage = signal<string>('');

  // Signal to track deleted floating files
  deletedFiles = signal<{ path: string, fileName: string }[]>([]);
  // Signal to track the loading state for deleting files
  isDeletingFiles = signal<boolean>(false);
  // Signal to track the status message for deleting files
  deleteStatusMessage = signal<string>('');

  deleteFloatingFiles() {
    this.isDeletingFiles.set(true);  // Set loading state to true
    this.deleteStatusMessage.set('Deleting floating files, please wait...');
    this.deletedFiles.set([]);  // Clear previous results

    // Start deleting floating files
    Promise.all([
      this.deleteFloatingFilesForHomePage(),
      this.deleteFloatingFilesForPortfolioPage(),
      this.deleteFloatingFilesForOverMijPage(),
      this.deleteFloatingFilesForDienstenPage()
    ]).then(() => {
      this.isDeletingFiles.set(false);  // Set loading state to false
      if (this.deletedFiles().length > 0) {
        this.deleteStatusMessage.set('Deletion completed. Floating files deleted.');
      } else {
        this.deleteStatusMessage.set('Deletion completed. No floating files found.');
      }
    });
  }

  private deleteFloatingFilesForHomePage() {
    return new Promise<void>((resolve) => {
      this.#adminPageService.readPageData<HomePage>('home')
        .pipe(untilDestroyed(this))
        .subscribe(page => {
          this.deleteFloatingFilesFromPage('home/diensten', page.diensten.map(d => d.imageId), resolve);
        });
    });
  }

  private deleteFloatingFilesForPortfolioPage() {
    return new Promise<void>((resolve) => {
      this.#adminPageService.readPageData<PortfolioPage>('portfolio')
        .pipe(untilDestroyed(this))
        .subscribe(page => {
          const categoriesPromises = page.categories.map(category => {
            const imageIds = category.pictures.map(picture => picture.id);
            return this.deleteFloatingFilesFromPage(`portfolio/${category.name.toLowerCase()}`, imageIds, resolve);
          });
          Promise.all(categoriesPromises).then(() => resolve());
        });
    });
  }

  private deleteFloatingFilesForOverMijPage() {
    return new Promise<void>((resolve) => {
      this.#adminPageService.readPageData<OverMijPage>('overMij')
        .pipe(untilDestroyed(this))
        .subscribe(page => {
          this.deleteFloatingFilesFromPage('overMij', [page.imageId], resolve);
        });
    });
  }

  private deleteFloatingFilesForDienstenPage() {
    return new Promise<void>((resolve) => {
      this.#adminPageService.readPageData<DienstenPage>('diensten')
        .pipe(untilDestroyed(this))
        .subscribe(page => {
          this.deleteFloatingFilesFromPage('diensten', page.diensten.map(d => d.imageId), resolve);
        });
    });
  }

  private deleteFloatingFilesFromPage(path: string, imageIds: string[], resolve: () => void) {
    list(ref(this.#storage, `${path}/resized`)).then(listResult => {
      const availableFiles = listResult.items.map(item => item.name);
      const floatingFiles = availableFiles.filter(file => {
        return !imageIds.some(imageId => file.startsWith(imageId));
      });

      floatingFiles.forEach(floatingFile => {
        deleteObject(ref(this.#storage, `${path}/resized/${floatingFile}`)).then(() => {
          this.deletedFiles.update(current => [
            ...current,
            {path: `${path}/resized`, fileName: floatingFile}
          ]);
        });
      });

      resolve();
    });
  }

  checkMissingFiles() {
    this.isCheckingFiles.set(true);  // Set loading state to true
    this.statusMessage.set('Checking files, please wait...');
    this.missingFiles.set([]);  // Clear previous results

    // Start checking for missing files
    Promise.all([
      this.checkMissingResizedFilesForHomePage(),
      this.checkMissingResizedFilesForPortfolioPage(),
      this.checkMissingResizedFilesForOverMijPage(),
      this.checkMissingResizedFilesForDienstenPage()
    ]).then(() => {
      this.isCheckingFiles.set(false);  // Set loading state to false
      if (this.missingFiles().length > 0) {
        this.statusMessage.set('Check completed. Missing files found.');
      } else {
        this.statusMessage.set('Check completed. No missing files.');
      }
    });
  }

  private checkMissingResizedFilesForHomePage() {
    return new Promise<void>((resolve) => {
      this.#adminPageService.readPageData<HomePage>('home')
        .pipe(untilDestroyed(this))
        .subscribe(page => {
          const promises = page.diensten.map(dienst =>
            this.checkMissingFilesForImageId('home/diensten', dienst.imageId)
          );
          Promise.all(promises).then(() => resolve());
        });
    });
  }

  private checkMissingResizedFilesForPortfolioPage() {
    return new Promise<void>((resolve) => {
      this.#adminPageService.readPageData<PortfolioPage>('portfolio')
        .pipe(untilDestroyed(this))
        .subscribe(page => {
          const promises = page.categories.flatMap(category =>
            category.pictures.map(picture =>
              this.checkMissingFilesForImageId(`portfolio/${category.name.toLowerCase()}`, picture.id)
            )
          );
          Promise.all(promises).then(() => resolve());
        });
    });
  }

  private checkMissingResizedFilesForOverMijPage() {
    return new Promise<void>((resolve) => {
      this.#adminPageService.readPageData<OverMijPage>('overMij')
        .pipe(untilDestroyed(this))
        .subscribe(page => {
          this.checkMissingFilesForImageId('overMij', page.imageId).then(() => resolve());
        });
    });
  }

  private checkMissingResizedFilesForDienstenPage() {
    return new Promise<void>((resolve) => {
      this.#adminPageService.readPageData<DienstenPage>('diensten')
        .pipe(untilDestroyed(this))
        .subscribe(page => {
          const promises = page.diensten.map(dienst =>
            this.checkMissingFilesForImageId('diensten', dienst.imageId)
          );
          Promise.all(promises).then(() => resolve());
        });
    });
  }

  private checkMissingFilesForImageId(path: string, imageId: string) {
    return list(ref(this.#storage, `${path}/resized`)).then(listResult => {
      const availableFiles = listResult.items.map(item => item.name);
      const missingFiles = this.getMissingResizedFiles(imageId, availableFiles);

      if (missingFiles.length > 0) {
        this.missingFiles.update(current => [
          ...current,
          {imageId, path, files: missingFiles}
        ]);
      }
    });
  }

  private getMissingResizedFiles(imageId: string, availableFiles: string[]): string[] {
    return RESOLUTIONS
      .map(resolution => `${imageId}_${resolution}.avif`)
      .filter(resizedFile => !availableFiles.includes(resizedFile));
  }
}
