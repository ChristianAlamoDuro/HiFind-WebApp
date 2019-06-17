import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '@services/admin/admin.service';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-search-premium',
    templateUrl: './search-premium.component.html',
    styleUrls: ['./search-premium.component.scss'],
    providers: [AdminService]
})


export class SearchPremiumComponent implements OnInit {
    //
    public gameTitle: string;
    // Creamos la variable searchTitle con lo que vamos a buscar en la barra de busqueda
    public searchTitle: string;
    // Creamos la variable movieResults sera un array de tipo any donde se guardará la respuesta de la api en formato json
    public gameResult: Array<any> = [];
    // Crearemos una variable result de tipo boolean de manera que cuando el servidor responda con contenido es decir se hayan
    // encontrado sugerencias a la busqueda se pondra a true
    public result: boolean;
    public dataAplication;

    constructor(
        // Creamos la variable activatedRoute de tipo activatedRouter para poder obtener el parametro de la url
        private activatedRoute: ActivatedRoute,
        // Creamos la variable publicapimovie de tipo publicmoviesapiserive para poder acceder a los metodos de la clase apimovieserice
        private adminService: AdminService,
        private router: Router,
        private dataService: DataAplicationService
    ) {
        this.dataService.getData().subscribe(
            result => {
                this.dataAplication = result;
            }
        );
        this.activatedRoute.params.subscribe(
            results => {
                this.searchTitle = this.getUrl();
                // llamamos al metodo searchMovie y le pasamos el resultado del parametro obtenido por la url
                this.searchGames(this.searchTitle);
            }
        );
    }
    ngOnInit() {
    }
    // Función para buscar la información por titulo en la api
    // Guardamos en el array movieResults todas las ocurrencias formato json
    getUrl() {
        return this.activatedRoute.snapshot.paramMap.get('name');
    }

    searchGames(title: string) {

        this.adminService.getGameByName(title)
            .pipe(
                map(data => data['games'])
            )
            .subscribe(
                results => {
                    this.gameResult = results;
                }
            );
    }
    // Funcion a la que se le pasa por parametros el titulo de la pelicula que en este momento se a
    // seleccionado y redirecciona a la ruta more-info pasandole por url ese titulo de pelicula
    moreInfo(movieTitle) {
        this.gameTitle = movieTitle;
        this.router.navigate(['/more-info/' + this.gameTitle]);
    }
}
