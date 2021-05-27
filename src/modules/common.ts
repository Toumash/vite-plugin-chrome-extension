import { EventEmitter } from "events";
import { ChromeExtensionManifest } from "@/manifest";
import { ChromeExtensionModule } from "@/common/models";

export interface IComponentProcessor {
    resolve(entry: ChromeExtensionManifest): void;
    stop(): Promise<void>;
    build(): Promise<ChromeExtensionModule | ChromeExtensionModule[]>;
    on(eventName: string, callback: (...args: any[]) => void): void;
}

export abstract class ComponentProcessor implements IComponentProcessor {
    private _event: EventEmitter = new EventEmitter();

    public on(eventName: string, callback: (...args: any[]) => void) {
        this._event.on(eventName, callback);
    }

    public off(eventName: string, callback: (...args: any[]) => void) {
        this._event.off(eventName, callback);
    }

    protected emit(eventName: string, ...args: any[]) {
        this._event.emit(eventName, ...args);
    }

    public abstract resolve(entry: ChromeExtensionManifest): void;
    public abstract stop(): Promise<void>;
    public abstract build(): Promise<ChromeExtensionModule | ChromeExtensionModule[]>;
}
