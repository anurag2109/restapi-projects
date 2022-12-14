import React from "react";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  const webExists = (
    <a href={website} target="_blank" rel="noopener noreferrer">
      <i className="fas fa-globe fa-2x" />
    </a>
  );

  const socialExists = Object.entries(social)
    .filter(([_, value]) => value)
    .map(([key, value]) => (
      <a key={key} href={value} target="_blank" rel="noopener noreferrer">
        <i className={`fab fa-${key} fa-2x`}></i>
      </a>
    ));
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company ? <span> at {company}</span> : null}
      </p>
      <p>{location ? <span>{location}</span> : null}</p>
      <div className="icons my-1">
        {website ? webExists : null}
        {social ? socialExists : null}
      </div>
    </div>
  );
};

export default ProfileTop;
