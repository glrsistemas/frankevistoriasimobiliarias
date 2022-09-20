package br.com.frankevistorias.apifvi.subGrupoImagem;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import br.com.frankevistorias.apifvi.grupoImagem.GrupoImagemEntity;
import lombok.Data;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Data
@Entity
@Table(name="sub_grupo_imagem")
public class SubGrupoImagemEntity implements Serializable{

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

    @JoinColumns({@JoinColumn(name = "id_grupo_imagem", referencedColumnName = "id")})
    @JsonProperty("idGrupoImagem")
    @ManyToOne()
    private GrupoImagemEntity grupoImagemEntity;
    
}