import { Button } from "@mui/material";
import './FilterButton.css'

const filtros = [
    'macho', 'hembra', 'pequeño', 'mediano', 'grande'
]

const FilterButton = () => {
    
    return(
        < >
            <div className="div-filters">
                <div id="filters">
                    {filtros.map( (filtro) => (
                        <Button key={filtro} sx={{ backgroundColor: 'transparent', height: 20, width: 80, fontSize:12, '&:hover': {
                            backgroundColor: 'darkgray',
                        }, }}  >{filtro}</Button>
                    ) )}
                </div>
                <div id="aplicar-btn">
                    <Button variant="outlined" size="small">Aplicar</Button>
                </div>
            </div>
        </>
    )
}

export default FilterButton;