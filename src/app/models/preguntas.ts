import { Grade } from "./Grade";
import { Respuestas } from "./Respuestas";

export class Preguntas{
IDPregunta?:number;
Pregunta?:string;
IDLevelGrade?: Grade;
Respuestas?:Respuestas[];
}