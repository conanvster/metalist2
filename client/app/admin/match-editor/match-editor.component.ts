import {Component, OnInit} from '@angular/core';
import {MatchEditorService} from '../../services/match-editor.service';
import {FileService} from '../../services/file.service';
import moment from 'moment-timezone';

import {Match} from '../../model/match.interface';

@Component({
  selector: 'app-match-editor',
  templateUrl: './match-editor.component.html',
  styleUrls: ['./match-editor.component.css']
})
export class MatchEditorComponent implements OnInit {

  nextMatches: Match[] = [];
  prevMatches: Match[] = [];
  matchToEdit: Match | Partial<Match> | null;
  message = '';

  constructor(private matchEditorService: MatchEditorService, private fileService: FileService) {
  }

  ngOnInit() {
    this.loadNextMatches();
    this.loadPrevMatches();
    this.getTeamLogos();
  }

  setMatchToEdit(match = {date: moment(new Date()).toISOString()}) {
    this.message = '';
    this.matchToEdit = match;
  }

  loadNextMatches = () => this.matchEditorService.loadNextMatches()
    .subscribe(
      (res) => this.nextMatches = res,
      err => console.log(err)
    )

  loadPrevMatches = () => this.matchEditorService.loadPrevMatches()
    .subscribe(
      res => this.prevMatches = res,
      err => console.log(err)
    )

  deleteMatch = (id: string) => {
    this.message = '';
    this.matchEditorService.deleteMatch(id)
      .subscribe(
        () => {
          this.prevMatches = this.prevMatches.filter(match => match.id !== id);
          this.nextMatches = this.nextMatches.filter(match => match.id !== id);
          this.matchToEdit = this.matchToEdit && this.matchToEdit.id === id ? null : this.matchToEdit;
          this.message = 'deleteSuccess';
        },
        () => this.message = 'deleteFail'
      );
  }

  saveMatch(match) {
    this.message = '';
    if (match.id) {
      this.matchEditorService.editMatch(match)
        .subscribe(
          () => {
            this.loadNextMatches();
            this.matchToEdit = null;
            this.message = 'editSuccess';
          },
          err => console.log(err)
        )
    } else {
      this.matchEditorService.createMatch(match)
        .subscribe(
          () => {
            this.loadNextMatches();
            this.matchToEdit = null;
            this.message = 'seatsCreationProcess';
          },
          err => console.log(err)
        );
    }
  }

  getTeamLogos = () => this.fileService.loadTeamLogos();

  closeForm = () => this.matchToEdit = null;

}
