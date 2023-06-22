import { Component } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
//import { ZipArchive } from "@shortercode/webzip";
import * as JSZip from 'jszip';
import * as fs from 'fs';

//http: HttpClient;

@Component({
  selector: 'app-latex-project-generator',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class LaTeXProjectGeneratorComponent {
  constructor(private httpClient: HttpClient) {}

  projectTypes: string[] = ['article', 'report', 'book', 'beamer'];


  //#
  // Für Abschnitte
sections: { title: string }[] = [];

// Für Kapitel und Abschnitte (nur relevant für book und beamer)
chapters: { title: string, sections: { title: string }[] }[] = [];

addChapter() {
  this.chapters.push({ title: '', sections: [] });
}

addSection(chapterIndex: number) {
  this.chapters[chapterIndex].sections.push({ title: '' });
}
//

  projectName!: string;
  authorName!: string;
  date!: string;
  projectType!: string;
  topic!: string;
  sources!: string;
  imgFolder!: boolean;
  outsourceSecs!: boolean;
  platform!: string;
  bib!: string;


  async generateLaTeXProject(): Promise<void> {

    let requests: Promise<any>[] = [];
    let map = new Map<string, string>(); // file:content
   //let archive = new ZipArchive();
   let zip = new JSZip();
  
    // img-Ordner
    if (this.imgFolder) {
      zip.folder("image");
    }
    
 // main.tex
 let buildShRequest = this.httpClient.get('assets/templates/main.tex', { responseType: 'text' }).toPromise();
 requests.push(buildShRequest.then((data) => {
   if (data) {
     let main_tex = data;
     main_tex = main_tex.replace("CLASS", this.projectType);
     main_tex = main_tex.replace("TITLE", this.projectName);
     main_tex = main_tex.replace("AUTHOR", this.authorName);
     main_tex = main_tex.replace("DATE", this.date);
     map.set("main.tex", main_tex);
   }
 }));
  
    // build
    
  
    if (this.platform == 'mac_linux_wsl' || this.platform == 'all') {
      let buildShRequest = this.httpClient.get('assets/templates/build.sh', { responseType: 'text' }).toPromise();
      requests.push(buildShRequest.then((data) => {
        //console.log(data);
        if (data) {
          map.set("build.sh", data);
        }
      }));
    }
  
    if (this.platform == 'windows' || this.platform == 'all') {
      let buildBatRequest = this.httpClient.get('assets/templates/build.bat', { responseType: 'text' }).toPromise();
      requests.push(buildBatRequest.then((data) => {
       // console.log(data);
        if (data) {
          map.set("build.bat", data);
        }
      }));
    }
  
    await Promise.all(requests); // Warten auf Abschluss aller HTTP-Anfragen
  
    console.log(map.size);
    console.log("map:", map);

    console.log("map:");
    map.forEach((value, key) => {
      //console.log(key + ": " + value);
      zip.file(key, value);
    });
    console.log(map.size);
  
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      if (blob) {
        saveAs(blob, 'example.zip');
      } else {
        console.log("Das Archiv ist leer.");
      }
    });
  }
  
  
}
