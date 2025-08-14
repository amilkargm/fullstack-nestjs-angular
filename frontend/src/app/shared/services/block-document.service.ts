import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BlockDocumentService {
    blockedDocument = signal<boolean>(false);

    blockDocument() {
        this.blockedDocument.set(true);
    }

    unblockDocument() {
        this.blockedDocument.set(false);
    }
}
