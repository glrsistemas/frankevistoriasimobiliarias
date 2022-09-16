package br.com.frankevistorias.apifvi.tipoVistoria;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TipoVistoriaRepository extends JpaRepository<TipoVistoriaEntity, Long> {

    }

