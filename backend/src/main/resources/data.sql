use webboard;

insert into user(account, password, gender, grade)
values ('gsy0122', '1234', '여자', '3');

insert into post(user_id, category, title, content)
values (1, 1, 'title1', 'content1'),
        (1, 1, 'title2', 'content2'),
        (1, 2, 'title3', 'content3'),
        (1, 2, 'title4', 'content4'),
        (1, 3, 'title5', 'content5'),
        (1, 3, 'title6', 'content6');