import {Component, OnDestroy} from '@angular/core';
import {ArticleService} from "./ArticleService";
import {ArticleDialogComponent} from "./article-dialog/aricle-dialog.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ArticleDisplayComponent} from "./article-display/article-display.component";
import {Article} from "./Interfaces";

@Component({
  selector: 'app-root',
  template: `
    <p-dataView #dv [value]="articleService.articles">
      <ng-template let-article pTemplate="listItem">
        <div class="col-12">
          <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">

            <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                 [src]="article.articleImgUrl" [alt]="article.headline"/>

            <div
              class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
              <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                <div class="text-2xl font-bold text-900">{{ article.headline }}</div>
                <div class="flex align-items-center gap-3"> {{ article.body }}</div>
              </div>
              <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                <p-button (onClick)="showArticleDialog(article.articleId)">Show more</p-button>
              </div>
            </div>

          </div>
        </div>
      </ng-template>
    </p-dataView>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'NewsfeedFrontend';
  ref: DynamicDialogRef | undefined;
  article: Article | undefined;

  constructor(public articleService: ArticleService, private dialogService: DialogService) {

  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  async showArticleDialog(articleId: number) {
    this.article = await this.articleService.getArticle(articleId);
    this.ref = this.dialogService.open( ArticleDisplayComponent, {
      data: {
        articleId: this.article.articleId,
      },
      header: 'Article',
      width: '70%',
      contentStyle: {'max-height': '70%', 'overflow': 'auto'},
      baseZIndex: 10000,
    });
  }
}
