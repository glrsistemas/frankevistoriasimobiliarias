package br.com.frankevistorias.apifvi.tipoVistoria;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoVistoriaRepository extends JpaRepository<TipoVistoriaEntity, Long> {

    }

