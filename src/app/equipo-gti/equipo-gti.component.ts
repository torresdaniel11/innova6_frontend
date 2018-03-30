import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-equipo-gti',
  templateUrl: './equipo-gti.component.html',
  styleUrls: ['./equipo-gti.component.css']
})
export class EquipoGtiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.gti-carousel').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false
    });
    $('.left').on('click', function(){
      $('.gti-carousel').slick('slickPrev');
    });

    $('.right').on('click', function(){
      $('.gti-carousel').slick('slickNext');
    });
  }

}
