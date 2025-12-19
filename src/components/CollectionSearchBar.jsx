import React from 'react';
import './CollectionSearchBar.css';

const CollectionSearchBar = () => {
    return (
        <div className="collection-search-bar-ctn">
            <input
                type="text"
                placeholder="(╭ರ_•́) Search Library..."
                className="input-field"
            />
        </div>
    );
};

export default CollectionSearchBar;
