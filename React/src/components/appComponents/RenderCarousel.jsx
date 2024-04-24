import carousel from "../../funcionalidades/carousel"
import React,  { useState, useEffect } from "react"

export default function RenderCarousel(datas){
    const dataFix = datas[0]
    return (
        <div className="carousel">
            <div id="carouselExampleControls"  className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <p>Previsão para <span className="data-result-regiao">{dataFix.date_br}</span></p>
                        <img src={dataFix.image} className="img-fluid img-carousel" alt="imagem-carousel"></img>                    
                    </div>

                    {datas.map((data, i)=>{
                        if(i > 0 ){
                            return(
                                <div className="carousel-item" key={i}>
                                    <p>Previsão para <span className="data-result-regiao">{data.date_br}</span></p>
                                    <img src={data.image} className="img-fluid img-carousel"  alt="carousel-imagem" />
                                </div>
                            )
                        }
                    })}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {}
        </div>
     )
    }
