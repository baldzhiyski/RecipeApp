package com.team2.client.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageResponseDto {

    private String imageUrl;

    public ImageResponseDto(String imageUrl) {
        this.imageUrl=imageUrl;
    }
}
