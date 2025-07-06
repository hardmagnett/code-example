import type {InjectionKey, Ref} from "vue";
import type {Position} from "./types";
export const allPositionsInjectionKey: InjectionKey<Ref<Position[]>> = Symbol();