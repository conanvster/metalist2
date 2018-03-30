import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Match } from '../../../model/match.interface';

import { PriceSchemaService } from '../../../services/price-schema.service';
import { FileService } from '../../../services/file.service';
import { TeamLogosService } from '../../../services/team-logos.service';
import moment from 'moment-timezone';

@Component({
  selector: 'edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {
  path = 'assets/teamLogo/';
  priceSchemas;
  teamLogos;

  @Input()
  match: Match;

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  closeMatch: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.loadPriceSchemas();
    this.loadTeamLogos();
  }

  constructor(private priceSchemaService: PriceSchemaService,
              private fileService: FileService,
              private teamLogosService: TeamLogosService) { }

  loadPriceSchemas = () => this.priceSchemaService.loadPrices()
    .subscribe(
      response => this.priceSchemas = response,
      err => console.log(err)
    )

  loadTeamLogos = () => this.teamLogosService.fetchTeamLogos()
    .subscribe(
      response => this.teamLogos = response,
      err => console.log(err)
    )


  handleFileInput(event) {
    const files = event.target.files;
    this.fileService.upload(files[0], 'teamLogo')
      .subscribe(
        () => {
          this.loadTeamLogos();
          this.match.poster = this.path + files[0].name;
        },
        err => console.log(err)

      );
  }

  setSelectedOption = (schema1, schema2) => schema1 && schema2 && schema1.id === schema2.id;

  saveMatch = () => {
    this.save.emit(this.match);
  }

  close = () => {
    this.closeMatch.emit();
  }

  handleTimeInput(event) {
    const time = moment(event.target.valueAsDate).utc();
    this.match.date = moment(this.match.date).hour(time.hour()).minute(time.minutes()).toISOString();
  }
}
