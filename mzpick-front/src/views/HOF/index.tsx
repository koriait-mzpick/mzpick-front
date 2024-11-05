import HOFFashion from './FashionHof'
import HOFFood from './FoodHof'
import HOFTravel from './TravelHof'
import './style.css';

export default function HOF() {
    return (
        <>
        <HOFTravel />
        <HOFFood />
        <HOFFashion />
        </>
    )
}
