package br.com.frankevistorias.apifvi.uriAssets;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Repository
public interface AssetsRepository extends JpaRepository<AssetsEntity, Long>{
/*
	Optional<AssetsEntity> findIdUsuario(Long idUsuario);
*/
public void init(String diretorio) {
    try {
        Files.createDirectory(Path.of(diretorio));
    } catch (IOException e) {
        throw new RuntimeException("Could not initialize folder for upload!");
    }
}
}
