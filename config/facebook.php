<?php

return [
    'graph' => [  
        'config' => [
            'markers' => [
                "places" => [
                    'icon' => "fa-map-marker",
                    'color' => "blue-dark",
                    'shape' => 'square'
                ],
                "events" => [
                    'icon' => "fa-calendar",
                    'color' => "orange",
                    'shape' => 'star'
                ]                
            ]
        ],      
        'places' => [
            'uri' => [
                'distance'=> 2000,
                'limit' => 500,
                'type' => 'place',                
                'fields' => 'id,name,picture,location,overall_rating,hours,about,category,category_list,contact_address,cover,culinary_team,current_location,description,events,fan_count,featured_video,food_styles,general_info,founded,impressum,is_always_open,is_permanently_closed,is_published,is_unclaimed,likes,link,name_with_location_descriptor,overall_star_rating,parking,payment_options,phone,photos,place_type,place_topic,price_range,product_catalogs,products,publisher_space,rating_count,restaurant_services,restaurant_specialties,single_line_address,start_info,tagged,website,were_here_count,checkins',
                'locale'=> ENV('APP_LOCALE')
            ],                                    
        ],
        'search' => [
            'uri' => [
                'distance'=> 2000,
                'limit' => 500,
                'type' => 'place',                
                'fields' => 'id,name,location,category,category_list',
                'locale'=> ENV('APP_LOCALE')
            ],                                    
        ],        
        'events' => [
            'uri' => [    
               ' distance'=> 2000,            
                'limit' => 100,
                'type' => 'place',                
                'fields' => 'id,name,events,location',
                'locale'=> ENV('APP_LOCALE')

            ],                                    
        ],
        'categories' => [
            'uri' => [
                'type' => 'placetopic',
                'topic_filter'=> 'all',
                'limit' => 2000,
                'fields' => 'name,has_children,top_subtopic_names,parent_ids,plural_name,count',
                'locale'=> ENV('APP_LOCALE')
            ]    
        ],
        'category' => [
            'uri' => [
                'fields' => 'name,has_children,top_subtopic_names,icon_url,plural_name',
                'locale'=> ENV('APP_LOCALE'),
                'icon_size' => 24
            ]    
        ], 
        'parent_categories' => [
            'uri' => [
                'type' => 'placetopic',
                'topic_filter'=> 'all',
                'limit' => 50000,
                'fields' => 'parent_ids',
                'locale'=> ENV('APP_LOCALE')
            ]    
        ],
    ],
    'default_categories' => [
        [
            'original' => "ARTS_ENTERTAINMENT",
            'description' => "Artes e Entretenimento",
            'default' => true
        ],
        [   
            'original' => "EDUCATION",
            'description' => "Educação",
            'default' => false        
        ],
        [
            'original' => "FITNESS_RECREATION",
            'description' => "Recreação",
            'default' => false        
        ],
        [
            'original' => "FOOD_BEVERAGE",
            'description' => "Alimentação",
            'default' => true        
        ],
        [
            'original' => "HOTEL_LODGING",
            'description' => "Hotéis e Hospedagem",
            'default' => true        
        ],
        [
            'original' => "MEDICAL_HEALTH",
            'description' => "Medicina e Saúde",
            'default' => false        
        ],
        [
            'original' => "SHOPPING_RETAIL",
            'description' => "Compras e Varejo",
            'default' => true        
        ],
        [
            'original' => "TRAVEL_TRANSPORTATION",
            'description' => "Trasportes e Viagens",
            'default' => false        
        ]
    ]               
];
