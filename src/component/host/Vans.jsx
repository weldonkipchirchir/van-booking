import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Vans.css";

function Vans() {
    const [vans, setVans] = useState([]);

    useEffect(() => {
        fetch("/api/host/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
            .catch(error => console.error("Error fetching vans:", error));
    }, []);

    return (
        <section className="container-vans">
            <h2 className="host-vans-title">Your listed vans</h2>
            <div className="host-vans-list">
                {vans.length > 0 ? (
                    <section>
                        {vans.map(van => (
                            <NavLink
                                to={`/host/vans/${van.id}`}
                                state={{ van }}
                                key={van.id}
                                className="host-van-link-wrapper"
                            >
                                <div className="host-van-single" key={van.id}>
                                    <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                                    <div className="host-van-info">
                                        <h3>{van.name}</h3>
                                        <p>${van.price}/day</p>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </section>
                ) : (
                    <h2>Loading...</h2>
                )}
            </div>
        </section>
    );
}

export default Vans;
