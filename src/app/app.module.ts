import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MatButtonModule, MatCardModule, MatSliderModule, MatToolbarModule } from "@angular/material";
import { CardService } from "./services/card.service";


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		MatButtonModule,
		MatCardModule,
		MatSliderModule,
		MatToolbarModule
	],
	providers: [
		CardService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
