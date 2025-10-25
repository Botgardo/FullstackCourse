
export default function Boton({simbolo, tipo = "boton"}){

    return (
        
        <button
        className={tipo}
        >
            Tengo este simbolo: {simbolo}
        </button>
    )
}