package br.com.frankevistorias.apifvi.grupoImagem;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

/**
 * @author Ilson Junior
 * @since 20/09/2022
 */

@Data
@Entity
@Table(name="grupo_imagem")
public class GrupoImagemEntity implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, unique = true)
	@JsonProperty("id")
	private Long	id;

    @Column(name = "descricao")
	@JsonProperty("descricao")
	private String descricao;

    @Column(name = "constante")
	@JsonProperty("constante")
	private String constante;

    @Column(name = "ordem")
	@JsonProperty("ordem")
	private Long ordem;
	
	@Column(name = "ativo")
	@JsonProperty("ativo")
	private Boolean ativo;
    
}