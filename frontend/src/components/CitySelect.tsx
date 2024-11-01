import { City, State } from "country-state-city";
import Select from "react-select"
import { useRecoilState } from "recoil";
import { formDataState } from "../atom";


interface Option{
    value: string,
    label:string
}

// interface SelectProps{
//     statevalue: Option | null,
//     cityvalue:  Option| null,
//     handleStateChange: (selectedState:Option|null) => void
//     handleCityChange: (selectedCity:Option|null) => void

// }

// interface Prop{
//     handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
// }
export const CitySelect = ()=>{

const [formData,setFormData] = useRecoilState(formDataState);
    
    const states = State.getStatesOfCountry('IN').map(state => ({
        value: state.isoCode,
        label: state.name
    }));

    const cities = formData.state ? City.getCitiesOfState('IN', formData.state.value).map(city => ({
        value: city.name,
        label: city.name
    }))
    : [];

    const handleStateChange = (selectedState: Option | null)=>{
        setFormData((prevData)=>({...prevData, state: selectedState}));
        setFormData((prevData)=>({...prevData, city: null}))
    }
    

    const handleCityChange = (selectedCity: Option|null) => {
        setFormData((prevData)=>({...prevData, city: selectedCity}))
    }
    
   
    

    return (
        <div className="flex justify-evenly">
            <Select options={states} value={formData.state} onChange={handleStateChange} placeholder="Select State" className=" w-1/2 mt-5 mb-2 ml-1"/>
            <Select options={cities} value={formData.city} onChange={handleCityChange} placeholder="Select City" className=" w-1/2 mt-5 mb-2 ml-2 mr-5" />

           
            
        </div>
    )
}