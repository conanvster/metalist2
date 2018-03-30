import {Component, Injectable, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Match} from "../model/match.interface";
import {MatchService} from "../services/match.service";
import {SharedDataService} from "../services/shared-data.service";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.less'],
  providers: [SharedDataService]
})
export class MatchComponent implements OnInit {

  matchId: string;
  match: Match;

  constructor(
    private route: ActivatedRoute,
    private dataService: SharedDataService,
    private matchService: MatchService
  ) {
    this.route.params.subscribe(params => this.matchId = params.matchId);
  }

  ngOnInit() {
    this.matchService.fetchMatch(this.matchId)
      .subscribe(
        result => {
          this.dataService.updateData(result);
          this.match = result;
        },
        err => console.log(err)
      )
  }
}
