package br.com.frankevistorias.apifvi.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long>{

    public Optional<UsuarioEntity> findByEmail(String email);

    public Optional<UsuarioEntity> findByLogin(String login);

}