import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Lesson } from './../model/lesson';
import { EntityCollectionServiceBase } from '@ngrx/data';
import { Injectable } from "@angular/core";

@Injectable()
export class LessonEnityService extends EntityCollectionServiceBase<Lesson>{

    constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
        super('Lesson', serviceElementFactory)
    }
}