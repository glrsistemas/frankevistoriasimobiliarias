package br.com.frankevistorias.apifvi.uriAssets;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Repository
public interface AssetsRepository extends JpaRepository<AssetsEntity, Long>{

}