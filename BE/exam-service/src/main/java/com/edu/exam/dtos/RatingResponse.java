package com.edu.exam.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@AllArgsConstructor
@Getter
public class RatingResponse {
    private BigDecimal rating;
    private Integer ratingCount;
    private Integer userRating;
}
