import React from 'react';
import { NavLink } from 'react-router-dom';

const TimelinesMenu = () => {
  return (
    <div className="content-header__list">
      <ul>
        <svg className="content-header__rhombus" xmlns="http://www.w3.org/2000/svg" width="39" height="40" fill="none">
          <path
            fill="#176876"
            d="M19.419.74L0 20.157l19.419 19.419 4.055-4.056L38.84 20.155 19.42.74zm0 32.46L6.362 20.16 19.41 7.12l13.06 13.04L19.42 33.2z"
          />
          <path fill="#26D2E5" d="M19.42 12.838l-7.32 7.32 7.32 7.316 7.315-7.316-7.315-7.32z" />
        </svg>
        <svg
          className="content-header__bottom-border"
          xmlns="http://www.w3.org/2000/svg"
          width="151"
          height="15"
          fill="none"
        >
          <path fill="#0A4356" d="M69.322.582l-5.79 5.794H43.24l-8.114 8.12H.207l9.201-9.202L14.115.582h55.207z" />
          <path
            fill="#176876"
            d="M39.361 14.495l4.636-4.638H67.19L76.465.582h74.21l-4.638 4.636H76.465l-9.275 9.277H39.361z"
          />
        </svg>
        <svg
          className="content-header__top-border"
          xmlns="http://www.w3.org/2000/svg"
          width="79"
          height="6"
          fill="none"
        >
          <path fill="#176876" d="M72.238 0H6.588L.792 5.794h77.229L72.238 0z" />
        </svg>
        <li>
          <NavLink exact to="/explore/timelines" activeClassName="content-header__navlink-active">
            Timelines
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore/templates" activeClassName="content-header__navlink-active">
            Templates
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default TimelinesMenu;
