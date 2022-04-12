import './app-filter.css';
import {act} from "@testing-library/react";

const AppFilter = (props) => {
    const btnData = [
        {name: 'all', label: "Все сотрудники"},
        {name: 'like', label: "На повышение"},
        {name: 'salary1000', label: "Зарплата больше 1000$"}
    ];

    const buttons = btnData.map(({name, label}) => {
        const active = props.filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';
        return (
            <button type="button"
                    className={`btn ${clazz}`}
                    key={name}
                    onClick={() => props.onToggleFilter(name)}>
                {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;