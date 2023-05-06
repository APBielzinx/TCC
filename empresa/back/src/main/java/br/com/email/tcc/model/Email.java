package br.com.email.tcc.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Email {

    private String name;
    private  String from;
    private  String to;
    private String subject;
    private String text;
    private int mailSend;

}
