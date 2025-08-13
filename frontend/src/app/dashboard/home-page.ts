import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    imports: [],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <div class="col-span-12 xl-col-span-12 h-full">
                <div class="card">
                    <header>
                        <h1 class="text-2xl font-semibold">Dashboard</h1>
                    </header>
                </div>
            </div>
        </div>
    `
})
export class HomePage {}
