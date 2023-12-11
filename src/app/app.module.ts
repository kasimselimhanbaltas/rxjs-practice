import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SelectUserComponent } from './select-user/select-user.component';
import { NameInputComponent } from './inputs/name-input/name-input.component';
import { UsernameInputComponent } from './inputs/username-input/username-input.component';
import { EmailInputComponent } from './inputs/email-input/email-input.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    EditUserComponent,
    SelectUserComponent,
    NameInputComponent,
    UsernameInputComponent,
    EmailInputComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
