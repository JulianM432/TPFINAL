from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from data.db import get_db
from api.models.cancha_models import CanchaModelOut, CanchaModel
from data.repositories.cancha_repo import CanchaRepo
from domain.exceptions.NotFound import NotFoundError
from domain.model.cancha import Cancha


canchas_router = APIRouter(prefix="/canchas")
repo = CanchaRepo()


@canchas_router.get("/", response_model=List[CanchaModelOut])
def get_all(db: Session = Depends(get_db)):
    return repo.get_all(db)


@canchas_router.get("/{cancha_id}", response_model=CanchaModelOut)
def get_by_id(cancha_id: int, db: Session = Depends(get_db)):
    try:
        cancha = repo.get_by_id(db, cancha_id)
        return cancha
    except NotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Cancha no encontrada"
        )


@canchas_router.post(
    "/", response_model=CanchaModelOut, status_code=status.HTTP_201_CREATED
)
def create(cancha: CanchaModel, db: Session = Depends(get_db)):
    try:
        cancha = Cancha(**cancha.model_dump(exclude_unset=True))
        return repo.create(cancha, db)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=f"{e}\n"
        )


@canchas_router.patch("/{cancha_id}", response_model=CanchaModelOut)
def edit(cancha_id: int, datos: CanchaModel, db: Session = Depends(get_db)):
    try:
        cancha = Cancha(**datos.model_dump(exclude_unset=True))
        return repo.edit(db, cancha_id, cancha)
    except NotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Cancha no encontrada"
        )


@canchas_router.delete("/{cancha_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete(cancha_id: int, db: Session = Depends(get_db)):
    try:
        return repo.delete(db, cancha_id)
    except NotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Cancha no encontrada"
        )
