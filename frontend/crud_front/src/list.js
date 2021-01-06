import React from 'react'

export default function list({val}) {
    return (
        
        <div>
            <h3>Name: {val.name}</h3>
            <h3>Age: {val.age}</h3>
            <h3>Country: {val.country}</h3>
            <h3>Position: {val.position}</h3>
            <h3>Wage: {val.wage}</h3>
        </div>
        
    );   
        
    
}
