<?php

return [
    'graph' => [
        'search' => [
            'uri' => [
                'distance'=> 5000,
                'limit' => 50000,
                'type' => 'place',
                'fields' => 'id,name,picture,location,overall_rating,hours,about,category,category_list,contact_address,cover,culinary_team,current_location,description,events,fan_count,featured_video,food_styles,general_info,founded,impressum,is_always_open,is_permanently_closed,is_published,is_unclaimed,likes,link,name_with_location_descriptor,overall_star_rating,parking,payment_options,phone,photos,place_type,place_topic,price_range,product_catalogs,products,publisher_space,rating_count,restaurant_services,restaurant_specialties,single_line_address,start_info,tagged,website,were_here_count,checkins'
            ],                                    
        ],
        'categories' => [
            'uri' => [
                'type' => 'placetopic',
                'topic_filter'=> 'all',
                'limit' => 50000,
                'locale'=> ENV('APP_LOCALE')
            ]    
        ],
    
    ],
];
