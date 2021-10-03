import * as JerarquiaModel from "../../models/gonet/jerarquia.model";

let rows = [];

export const getJerarquia = async (nombre) => {
    rows = await JerarquiaModel.getListaNombres();
    let listJerarquia = await ordenarJerarquia(nombre);
    return listJerarquia;
};


export const ordenarJerarquia = async (nombreSearch) => {
    let listaNombres = {nombre:"", padres:[]}
    let listaPadres = [];

    for(const i in rows) {
        if(rows[i].nombre==nombreSearch) {
            listaNombres.nombre=rows[i].nombre;

            if(rows[i].padre) {
                listaPadres =  await buscaPadres(rows[i].padre, listaPadres);
            }

            listaNombres.padres = listaPadres;
        }
    }

    return listaNombres;
}

export const buscaPadres = async (padreId, listaPadres = []) => {
    
    for(const i in rows) {
        if(rows[i].id==padreId) {
            listaPadres.push(rows[i].nombre);
            if(rows[i].padre) {
                listaPadres = await buscaPadres(rows[i].padre, listaPadres);
            }
        }
    }

    return listaPadres;
}