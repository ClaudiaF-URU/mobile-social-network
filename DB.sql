
CREATE SEQUENCE public.publish_publish_id_seq_1;

CREATE TABLE public.publish (
                publish_id INTEGER NOT NULL DEFAULT nextval('public.publish_publish_id_seq_1'),
                publish_user VARCHAR NOT NULL,
                publish_title VARCHAR NOT NULL,
                publish_filename VARCHAR NOT NULL,
                publish_url VARCHAR NOT NULL,
                publish_type VARCHAR NOT NULL,
                publish_location VARCHAR NOT NULL,
                publish_tags VARCHAR NOT NULL,
                publish_date VARCHAR NOT NULL,
                CONSTRAINT publish_pk PRIMARY KEY (publish_id)
);


ALTER SEQUENCE public.publish_publish_id_seq_1 OWNED BY public.publish.publish_id;

CREATE SEQUENCE public.app_user_id_user_seq;

CREATE TABLE public.app_user (
                id_user INTEGER NOT NULL DEFAULT nextval('public.app_user_id_user_seq'),
                user_name VARCHAR NOT NULL,
                user_lastname VARCHAR NOT NULL,
                user_email VARCHAR NOT NULL,
                user_nickn VARCHAR NOT NULL,
                user_pass VARCHAR NOT NULL,
                user_token VARCHAR NOT NULL,
                CONSTRAINT app_user_pk PRIMARY KEY (id_user)
);


ALTER SEQUENCE public.app_user_id_user_seq OWNED BY public.app_user.id_user;

CREATE TABLE public.likes (
                id_user INTEGER NOT NULL,
                publish_id INTEGER NOT NULL,
                CONSTRAINT likes_pk PRIMARY KEY (id_user, publish_id)
);


ALTER TABLE public.likes ADD CONSTRAINT publish_likes_fk
FOREIGN KEY (publish_id)
REFERENCES public.publish (publish_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.likes ADD CONSTRAINT app_user_likes_fk
FOREIGN KEY (id_user)
REFERENCES public.app_user (id_user)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;
