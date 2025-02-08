import React from 'react';

interface DropdownMenuProps {
    title: string;
    options: string[];
    onSelect: (value: string) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, options, onSelect }) => {
    return (
        <div className="btn-group dropend">
            <button className="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {title}
            </button>
            <ul className="dropdown-menu">
                {options.map((value) => (
                    <li key={value}>
                        <a className="dropdown-item" onClick={() => onSelect(value)}>
                            {value}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DropdownMenu;