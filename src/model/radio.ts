import { APP } from '../app/app';
import PlayerModel from './player';

export default class Radio extends PlayerModel {
    constructor(
        id: string,
        title: string,
        listening: boolean,
        image: string | undefined,
        time: number | undefined
    ) {
        super(id, title, listening, image, time);

        this.statusKey = 'streaming';
        this.statusText = 'Streaming';
        this.trayMessage = `Radio • ${this.title}`;
        this.notification = `${this.title}\nRadio`;
    }

    getState(): string {
        return 'Radio';
    }

    getStartTimestamp(): number | undefined {
        return this.time;
    }

    getEndTimestamp(): number | undefined {
        return undefined;
    }

    getImageText(): string {
        return APP.name;
    }
}
