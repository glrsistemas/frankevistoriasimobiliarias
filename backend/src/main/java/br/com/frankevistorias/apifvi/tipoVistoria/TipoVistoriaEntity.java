package br.com.frankevistorias.apifvi.tipoVistoria;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@Entity
@Table(name = "tipoVistoria")
public class TipoVistoriaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, unique = true)
    @JsonProperty("id")
    private Long	id;

    @Column(name = "descricao")
    @JsonProperty("descricao")
    private String descricao;

    @NotBlank(message = "Constante Tipo de Vistoria está vazia")
    @Column(name = "constante")
    @JsonProperty("constante")
    private String constante;

    @Column(name = "dh_registro",columnDefinition="DATETIME")
    @JsonProperty("dhRegistro")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dhRegistro;

    @Column(name = "dh_atualizacao",columnDefinition="DATETIME")
    @JsonProperty("dhAtualizacao")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dhAtualizacao;
}
