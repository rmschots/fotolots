import { ChangeDetectionStrategy, Component, inject, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';

interface FileUpload {
  file: File;
  progress: number;
  uploadedName?: string;
  downloadURL?: string;
  id?: string;
}

export interface UploadParams {
  path: string;
  multi: boolean;
}

export interface UploadResult {
  id: string;
  originalName: string;
  width: number;
  height: number;
  extension: string;
  storagePath: string;
  downloadURL: string;
}

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/tiff'];

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadDialogComponent {
  #storage: Storage = inject(Storage);

  isDragging = signal(false);
  files = signal<FileUpload[]>([]);
  isUploading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public uploadParams: UploadParams
  ) {
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const selectedFiles = input.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const validFiles = Array.from(selectedFiles).filter(this.isValidFileType);
      const newFiles = validFiles.map(file => ({file, progress: 0}));
      if (this.uploadParams.multi) {
        this.files.update(files => [...files, ...newFiles]);
      } else {
        this.files.set(newFiles.length > 0 ? [newFiles[0]] : []);
      }
      if (validFiles.length !== selectedFiles.length) {
        this.errorMessage.set('Some files were not added because they are not of the allowed types.');
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    const droppedFiles = event.dataTransfer?.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const validFiles = Array.from(droppedFiles).filter(this.isValidFileType);
      const newFiles = validFiles.map(file => ({file, progress: 0}));
      this.files.update(files => [...files, ...newFiles]);

      if (validFiles.length !== droppedFiles.length) {
        this.errorMessage.set('Some files were not added because they are not of the allowed types.');
      }
    }
  }

  private isValidFileType = (file: File): boolean => {
    return ALLOWED_FILE_TYPES.includes(file.type);
  }

  uploadFiles() {
    if (this.files().length === 0) return;

    this.isUploading.set(true);
    this.errorMessage.set(null);

    const uploadPromises = this.files().map((fileUpload, index) => this.uploadFile(fileUpload, index));

    Promise.all(uploadPromises).then((results) => {
      this.isUploading.set(false);
      this.dialogRef.close(results);
    }).catch((error) => {
      this.isUploading.set(false);
      this.errorMessage.set('An error occurred during upload. Please try again.');
      console.error('Upload failed', error);
    });
  }

  private uploadFile(fileUpload: FileUpload, index: number): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const uuid = uuidv4();
      const extension = fileUpload.file.name.split('.').pop();
      const uploadedName = `${uuid}.${extension}`;
      const storagePath = `${this.uploadParams.path}/${uploadedName}`;
      const storageRef = ref(this.#storage, storagePath);
      // Create a FileReader to load the image and get dimensions
      const reader = new FileReader();
      const image = new Image();

      reader.onload = (event: any) => {
        image.src = event.target.result;
      };

      image.onload = () => {
        const width = image.width;
        const height = image.height;
        console.log('wxh', width, height);

        const uploadTask = uploadBytesResumable(storageRef, fileUpload.file);

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.updateFileProgress(index, progress);
          },
          (error) => {
            console.error('Upload failed', error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              this.updateFileUploadComplete(index, uuid, uploadedName, downloadURL);
              resolve({
                id: uuid,
                originalName: fileUpload.file.name,
                storagePath,
                downloadURL,
                width,  // Use the actual width of the image
                height,  // Use the actual height of the image,
                extension: extension ?? ''
              });
            });
          }
        );
      };

      // Start reading the file as a data URL
      reader.readAsDataURL(fileUpload.file);
    });
  }

  private updateFileProgress(index: number, progress: number) {
    this.files.update(files => {
      const updatedFiles = [...files];
      updatedFiles[index] = {...updatedFiles[index], progress};
      return updatedFiles;
    });
  }

  private updateFileUploadComplete(index: number, id: string, uploadedName: string, downloadURL: string) {
    this.files.update(files => {
      const updatedFiles = [...files];
      updatedFiles[index] = {...updatedFiles[index], id, uploadedName, downloadURL};
      return updatedFiles;
    });
  }

  removeFile(index: number) {
    this.files.update(files => files.filter((_, i) => i !== index));
    if (this.files().length === 0) {
      this.errorMessage.set(null);
    }
  }
}
