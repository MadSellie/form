import {Component} from 'react';
import './app.css';
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";
import nextId from "react-id-generator";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John', salary: 800, increase: false, like: true, id: nextId()},
                {name: 'Alex', salary: 3000, increase: true, like: false, id: nextId()},
                {name: 'Gause', salary: 5000, increase: false, like: false, id: nextId()},
            ],
            term: '',
            filter: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    createElem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            like: false,
            id: nextId()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id){
                    return {...item, [prop]: !item[prop]};
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    searchFilter = (items, filter) => {
        switch (filter) {
            case 'like':
                return items.filter(items => items.like);
            case 'salary1000':
                return items.filter(items => items.salary > 1000);
            default:
                return items;
        }
    }

    onToggleFilter = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.searchFilter(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onToggleFilter={this.onToggleFilter}/>
                </div>

                <EmployersList data={visibleData}
                               onDelete={this.deleteItem}
                               onToggleProp={this.onToggleProp}/>
                <EmployersAddForm onCreateElem={this.createElem}/>
            </div>
        );
    }
}

export default App;