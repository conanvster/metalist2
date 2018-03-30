import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../../services/match.service';
import {Match} from '../../model/match.interface';
import {PriceSchema} from '../../model/price-schema.interface';

@Component({
  selector: 'app-select-sector',
  templateUrl: './select-sector.component.html',
  styleUrls: ['./select-sector.component.less']
})
export class SelectSectorComponent implements OnInit {

  matchId: string;
  priceSchema: PriceSchema;
  match: Match;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matchService: MatchService
  ) {
    this.route.params.subscribe(params => this.matchId = params.matchId);
  }

  ngOnInit() {
    this.matchService.fetchMatch(this.matchId)
      .subscribe(
        result => {
          this.match = result;
          this.priceSchema = this.match.priceSchema.priceSchema;
        },
        err => console.log(err)
      );
  }

  goToSector = (sector) =>
    this.router.navigate(['sectors', this.match['_id'], sector.tribune, sector.sector]);
}
