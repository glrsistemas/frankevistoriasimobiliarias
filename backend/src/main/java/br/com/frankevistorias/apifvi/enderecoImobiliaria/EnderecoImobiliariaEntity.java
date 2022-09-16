package br.com.frankevistorias.apifvi.enderecoImobiliaria;

import com.fasterxml.jackson.annotation.JsonProperty;
import br.com.frankevistorias.apifvi.imobiliaria.ImobiliariaEntity;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
@Data
@Entity
@Table(name="enderecoImobiliaria")
public class EnderecoImobiliariaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, unique = true)
    @JsonProperty("id")
    private Long	id;

    @NotBlank(message="Logradouro vazio")
    @Column(name = "logradouro")
    @JsonProperty("logradouro")
    private String logradouro;

    @NotBlank(message="Numero vazio")
    @Column(name = "numero")
    @JsonProperty("numero")
    private String numero;

    @NotBlank(message="CEP vazio")
    @Column(name = "cep")
    @JsonProperty("cep")
    private String cep;

    @NotBlank(message="Bairro vazio")
    @Column(name = "bairro")
    @JsonProperty("bairro")
    private String bairro;

    @NotBlank(message="Cidade vazio")
    @Column(name = "cidade")
    @JsonProperty("cidade")
    private String cidade;

    @NotBlank(message="estado vazio")
    @Column(name = "estado")
    @JsonProperty("estado")
    private String estado;

    @Column(name = "complemento")
    @JsonProperty("complemento")
    private String complemento;

    @Column(name = "dh_registro",columnDefinition="DATETIME")
    @JsonProperty("dhRegistro")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dhRegistro;

    @Column(name = "dh_atualizacao",columnDefinition="DATETIME")
    @JsonProperty("dhAtualizacao")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dhAtualizacao;

    @JoinColumns({@JoinColumn(name = "id_imobiliaria", referencedColumnName = "id")})
    @JsonProperty("idImobiliaria")
    @ManyToOne()
    private ImobiliariaEntity imobiliariaEntity;
}
