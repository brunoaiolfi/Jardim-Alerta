// model/Post.js
import { Model } from '@nozbe/watermelondb'
import { field, text } from '@nozbe/watermelondb/decorators'

export default class Environment extends Model {
    static table = 'environments';

    @text('title') title: string;
}