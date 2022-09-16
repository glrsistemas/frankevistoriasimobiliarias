package br.com.frankevistorias.apifvi.config;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author Ilson Junior
 * @since 11/05/2022
 */

@Data
@Entity
@Table(name="config")
public class ConfigEntity implements Serializable {
    
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, unique = true)
	@JsonProperty("id")
	private Long	id;

    @Column(name = "constante")
	@JsonProperty("constante")
	private String constante;

    @Column(name = "descricao")
	@JsonProperty("descricao")
	private String descricao;
	
	@Column(name = "ativo")
	@JsonProperty("ativo")
	private Boolean ativo;
	
	@Column(name = "nivel")
	@JsonProperty("nivel")
	private Long nivel;

	@Column(name = "dh_registro",columnDefinition="DATETIME")
	@JsonProperty("dhRegistro")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dhRegistro;

	@Column(name = "dh_atualizacao",columnDefinition="DATETIME")
	@JsonProperty("dhAtualizacao")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dhAtualizacao;
    
}