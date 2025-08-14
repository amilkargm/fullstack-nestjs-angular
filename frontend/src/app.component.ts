import { BlockDocumentService } from '@shared/services/block-document.service';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { BlockUI } from 'primeng/blockui';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ButtonModule, Toast, BlockUI],
    templateUrl: './app.html'
})
export class AppComponent {
    blockDocumentService = inject(BlockDocumentService);
}
