import React from 'react';

export const displayValue = (value) => {
    if(value === null || value === undefined || value === '') return 'N/A';
    return value;
};